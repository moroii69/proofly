import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

interface ProgramLink {
  id: number
  url: string
  title: string
  type?: string
}

const programLinks: ProgramLink[] = [
  { id: 1, url: "https://pastebin.com/htjVfN1i", title: "Program 1" },
  { id: 2, url: "https://pastebin.com/QuEweQVh", title: "Program 2" },
  { id: 3, url: "https://pastebin.com/yxdaUDUj", title: "Program 3" },
  { id: 4, url: "https://pastebin.com/FAKFSZCQ", title: "Program 4" },
  { id: 5, url: "https://pastebin.com/0UmyvHPg", title: "Program 5" },
  { id: 6, url: "https://hastebin.com/share/ahiwurakap.python", title: "Program 6", type: "Python" },
  { id: 7, url: "https://hastebin.com/share/jawuqufubu.python", title: "Program 7", type: "Python" },
  { id: 8, url: "https://hastebin.com/share/qikimuxosa.python", title: "Program 8", type: "Python" },
  { id: 9, url: "https://hastebin.com/share/ipineyotoh.swift", title: "Program 9", type: "Swift" },
  { id: 10, url: "https://hastebin.com/share/acucigefun.makefile", title: "Program 10", type: "Makefile" },
  { id: 11, url: "https://hastebin.com/share/uvicebubip.python", title: "Program 11", type: "Python" },
  { id: 12, url: "https://hastebin.com/share/pewasuhefi.python", title: "Program 12", type: "Python" },
]

export default function ProgramLinksPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Program Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {programLinks.map((program) => (
              <a
                key={program.id}
                href={program.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="transition-all hover:shadow-lg">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-medium">{program.title}</h3>
                      {program.type && (
                        <p className="text-sm text-muted-foreground">
                          {program.type}
                        </p>
                      )}
                    </div>
                    <ExternalLink 
                      className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" 
                    />
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}