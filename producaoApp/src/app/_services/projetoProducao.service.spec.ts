/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjetoProducaoService } from './projetoProducao.service';

describe('Service: ProjetoProducao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjetoProducaoService]
    });
  });

  it('should ...', inject([ProjetoProducaoService], (service: ProjetoProducaoService) => {
    expect(service).toBeTruthy();
  }));
});
