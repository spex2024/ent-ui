import Header from "@/app/components/page-ui/header";
import {NextUIProvider} from "@nextui-org/react";


export default function Layout({ children }) {
    return (
        <>
                    <NextUIProvider>
                    <Header/>
                    <main>{children}</main>

                    </NextUIProvider>

        </>

    )
}