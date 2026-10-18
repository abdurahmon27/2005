import type { MakhrajId } from "@/data/arabic/letters";

/** The articulation points, deepest first. */
export const ZONES: {
  id: MakhrajId;
  title: string;
  text: string;
  letters: string[];
  /** Where the point is on the mouth diagram, and where its number sits. */
  at: [number, number];
  badge: [number, number];
}[] = [
  { id: "jawf", title: "The open space", text: "No contact at all — the air of the mouth and throat. Only the three long vowels live here.", letters: ["alif", "waw", "ya"], at: [212, 152], badge: [212, 152] },
  { id: "throat-deep", title: "Deep in the throat", text: "Next to the voice box: the catch of hamza and the soft breath of hā.", letters: ["hamza", "hha"], at: [289, 318], badge: [348, 318] },
  { id: "throat-middle", title: "Middle of the throat", text: "Squeeze here: ʿayn with voice, ḥā as breath. English has neither — listen a lot.", letters: ["ayn", "ha"], at: [291, 258], badge: [348, 258] },
  { id: "throat-near", title: "Top of the throat", text: "Closest to the mouth: the gargle of ghayn and the scrape of khā.", letters: ["ghayn", "kha"], at: [287, 198], badge: [348, 198] },
  { id: "tongue-back", title: "Back of the tongue", text: "The back of the tongue meets the soft palate: qāf deepest, kāf a little forward.", letters: ["qaf", "kaf"], at: [250, 170], badge: [270, 92] },
  { id: "tongue-middle", title: "Middle of the tongue", text: "The middle of the tongue rises to the hard palate.", letters: ["jim", "shin", "ya"], at: [176, 163], badge: [190, 92] },
  { id: "tongue-side", title: "Side of the tongue", text: "One or both sides of the tongue press on the upper molars — ḍād, the letter Arabic is named after.", letters: ["dad"], at: [206, 182], badge: [206, 232] },
  { id: "tongue-edge", title: "Tip and edge", text: "The tip and edge of the tongue on the gum ridge: lām, nūn, and the tapped rā.", letters: ["lam", "nun", "ra"], at: [116, 176], badge: [134, 238] },
  { id: "tongue-gums", title: "Tip on the gum ridge", text: "A full stop and release behind the upper teeth.", letters: ["tta", "dal", "ta"], at: [103, 168], badge: [24, 146] },
  { id: "tongue-whistle", title: "Tip behind the teeth", text: "Air whistles through a narrow gap: the s-family.", letters: ["sad", "zay", "sin"], at: [98, 196], badge: [24, 230] },
  { id: "tongue-teeth", title: "Tip between the teeth", text: "The tongue peeks out under the upper teeth: the th-family.", letters: ["dha", "dhal", "tha"], at: [92, 186], badge: [24, 174] },
  { id: "lips", title: "The lips", text: "Teeth on the lip for fā; both lips for bā, mīm and wāw.", letters: ["fa", "ba", "mim", "waw"], at: [70, 188], badge: [24, 202] },
  { id: "nose", title: "The nose", text: "Ghunna — the hum of a doubled or hidden nūn and mīm — comes out here.", letters: ["nun", "mim"], at: [150, 122], badge: [150, 122] },
];

export const MAKHRAJ_TITLES = Object.fromEntries(ZONES.map((zone) => [zone.id, zone.title.toLowerCase()])) as Record<MakhrajId, string>;
