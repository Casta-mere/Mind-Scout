import { Scope } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const scopeMap: Record<
  Scope,
  { label: string; color: "tomato" | "sky" | "brown" }
> = {
  PRIVATE: { label: "Private", color: "tomato" },
  PROTECTED: { label: "Protected", color: "brown" },
  PUBLIC: { label: "Public", color: "sky" },
};

const NoteScpoeBadge = ({ scope }: { scope: Scope }) => {
  return <Badge color={scopeMap[scope].color}>{scopeMap[scope].label}</Badge>;
};
export default NoteScpoeBadge;
