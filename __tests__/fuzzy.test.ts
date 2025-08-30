
import { levenshtein, score, rank } from "@/lib/fuzzy";
test("levenshtein basics", ()=>{
  expect(levenshtein("kitten","sitting")).toBe(3);
  expect(levenshtein("a","a")).toBe(0);
});
test("rank picks items", ()=>{
  const items=[{label:"People",href:"/en/people"},{label:"Capabilities",href:"/en/capabilities"}];
  const r=rank("peo",items); expect(r[0].label).toBe("People");
});
