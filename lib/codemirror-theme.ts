import { tags } from "@lezer/highlight"
import createTheme from "@uiw/codemirror-themes"

const customCodemirrorTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#151515",
    foreground: "#E5E5E5",
    caret: "#E5E5E5",
    selection: "#BFD084",
    selectionMatch: "#BFD084",
    lineHighlight: "#151515",
    gutterBackground: "#151515",
    gutterForeground: "#E5E5E5",
  },
  styles: [
    {
      tag: tags.comment,
      color: "#86897A",
    },
    {
      tag: tags.variableName,
      color: "#ffffff",
    },
    {
      tag: [tags.string, tags.special(tags.brace)],
      color: "#BFD084",
    },
    {
      tag: tags.number,
      color: "#7AD9FB",
    },
    {
      tag: tags.bool,
      color: "#7AD9FB",
    },
    {
      tag: tags.null,
      color: "#7AD9FB",
    },
    {
      tag: tags.operator,
      color: "#BFD084",
    },
    {
      tag: tags.keyword,
      color: "#A390FF",
    },
    {
      tag: tags.className,
      color: "#BFD084",
    },
    {
      tag: tags.definition(tags.typeName),
      color: "#A390FF",
    },
    {
      tag: tags.typeName,
      color: "#A390FF",
    },
    {
      tag: tags.tagName,
      color: "#ffffff",
    },
    {
      tag: tags.attributeName,
      color: "#A390FF",
    },
  ],
})

export default customCodemirrorTheme
