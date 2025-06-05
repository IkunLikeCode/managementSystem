import { get } from "@/http/request";

export function getProjectList<T>() {
  return get<T>({}, "/projects");
}
