import { Work } from "../models/work";

export class WorkSearchService {
  constructor(workRepository) {
    this.workRepository = workRepository;
  }
  async search(query) {
    const works = await this.workRepository.find(
      {
        $text: { $search: query }
      },
      { score: { $meta: "textScore" } }
    );
    return works.sort((work1, work2) => work1.score < work2.score);
  }
}

export default new WorkSearchService(Work);
