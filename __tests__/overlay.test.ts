
import { overlay } from "@/lib/overlay/OverlayManager";
test("overlay toggles and is exclusive", ()=>{
  overlay.open("capabilities");
  expect(overlay.value).toBe("capabilities");
  overlay.toggle("capabilities");
  expect(overlay.value).toBe(null);
  overlay.open("resources");
  overlay.open("about");
  expect(overlay.value).toBe("about");
});
