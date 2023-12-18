import { BaseService } from '~/services'
import { environment } from '~/environments'
import { Program } from '~/models'

class ProgramService extends BaseService<Program> {
  url = environment.apiUrl + '/program'
}
export const programService = new ProgramService(Program)
