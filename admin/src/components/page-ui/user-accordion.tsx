import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import DataTable from "@/components/page-ui/table";

export function UserAccordion({name , location , users,image}: {name: string, location: string, users:[], image:string}) {
    console.log(location, location, users);
    return (
        <Accordion type="single" collapsible className="w-full ">
            <AccordionItem value={name}>
                <AccordionTrigger >
                    <div className="flex items-center gap-3">
                        <img src={image} alt={''} width={50} className={`rounded-full w-12 h-12 border-2 border-black`}   />
                        <div className={`flex items-center gap-3`}>
                            <h2 className="text-md font-bold">{name}</h2>
                            <p className="text-sm text-gray-500">{location}</p>
                        </div>

                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <DataTable user={users}/>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}
