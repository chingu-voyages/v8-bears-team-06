import { Work } from "../models/work";

export class WorkSearchService {
  constructor(workRepository) {
    this.workRepository = workRepository;
  }
  async search(query) {
    // const works = await this.workRepository.find({
    //   $text: { $search: query }
    // });
    const works = await this.workRepository.find({
      title: { $regex: query }
    });
    return works;
  }
}

export default new WorkSearchService(Work);
