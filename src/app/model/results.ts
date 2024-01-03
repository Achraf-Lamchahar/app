import {Film} from "./film";

export interface Results {
  page: number;
  results: Film[];
  total_pages: number;
  total_results: number;
}
