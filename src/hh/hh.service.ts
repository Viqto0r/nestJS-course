import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_URL, CLUSTER_FIND_ERROR, SALARY_CLUSTER_ID } from './hh.constants';
import { HhResponse } from './hh.models';
import { HHData } from 'src/top-page/top-page.model';

@Injectable()
export class HhService {
  private token: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.token = configService.get('HH_TOKEN') ?? '';
  }

  async getData(text: string) {
    try {
      const { data } = await this.httpService
        .get<HhResponse>(API_URL.VACANCIES, {
          params: {
            text,
            clusters: true,
          },
          headers: {
            'User-Agent': 'OwlTop 1.0',
            Authorization: 'Bearer ' + this.token,
          },
        })
        .toPromise();

      return this.parseData(data);
    } catch (e) {
      Logger.error(e);
    }
  }

  private parseData(data: HhResponse): HHData {
    const salaryCluster = data.clusters.find(
      (cluster) => cluster.id === SALARY_CLUSTER_ID,
    );

    if (!salaryCluster) {
      throw new Error(CLUSTER_FIND_ERROR);
    }

    const itemsLength = salaryCluster.items.length;

    const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name);
    const middleSalary = this.getSalaryFromString(
      salaryCluster.items[Math.ceil(itemsLength / 2)].name,
    );
    const seniorSalary = this.getSalaryFromString(
      salaryCluster.items[itemsLength - 1].name,
    );

    return {
      count: data.found,
      juniorSalary,
      middleSalary,
      seniorSalary,
      updatedAt: new Date(),
    };
  }

  private getSalaryFromString(string: string): number {
    const numberRexExp = /(\d)+/g;
    const result = string.match(numberRexExp);

    if (!result) {
      return 0;
    }

    return Number(result[0]);
  }
}
