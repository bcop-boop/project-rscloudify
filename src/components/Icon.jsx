import { PenTool, LayoutDashboard, Code2, Sparkles, Smartphone, Boxes, Cloud, Workflow, Lightbulb, Cpu, Layers, TrendingUp, HeartHandshake } from 'lucide-react'

const icons = { PenTool, LayoutDashboard, Code2, Sparkles, Smartphone, Boxes, Cloud, Workflow, Lightbulb, Cpu, Layers, TrendingUp, HeartHandshake }

export default function Icon({ name, ...props }) {
  const Cmp = icons[name] ?? Code2
  return <Cmp {...props} />
}
