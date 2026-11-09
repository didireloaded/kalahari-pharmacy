import {describe,expect,it} from "vitest";
import {getWindhoekStatus,type OpeningSchedule} from "@/lib/hours";
describe("Windhoek opening hours",()=>{
 const example:OpeningSchedule={Mon:{open:"08:00",close:"18:00"},Tue:{open:"08:00",close:"18:00"}};
 it("never invents live hours without a verified schedule",()=>{
  expect(getWindhoekStatus(new Date("2026-11-09T06:00:00Z")).state).toBe("unknown");
 });
 it("checks Windhoek time explicitly instead of browser timezone",()=>{
  expect(getWindhoekStatus(new Date("2026-11-09T06:00:00Z"),example)).toEqual({state:"open",text:"Open now • Closes at 18:00"});
  expect(getWindhoekStatus(new Date("2026-11-09T05:00:00Z"),example).state).toBe("closed");
 });
 it("does not accept invalid opening times as confirmed hours",()=>{
  expect(getWindhoekStatus(new Date("2026-11-09T06:00:00Z"),{Mon:{open:"x",close:"18:00"}}).state).toBe("unknown");
 });
});
