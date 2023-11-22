export abstract class BaseService {
  protected async manageResponse(response: any) {
    const data = await response.json()
    if (data.errorMessage) throw new Error(data.errorMessage)
    return data
  }
}
