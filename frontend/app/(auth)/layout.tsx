import type { ReactNode } from "react";

export default function AuthLayout({
    children,
}:{
    children:ReactNode;
}){

    return(

        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">

            <div
                className="
                absolute
                left-[-150px]
                top-[-150px]
                h-[400px]
                w-[400px]
                rounded-full
                bg-blue-500/20
                blur-[150px]
                "
            />

            <div
                className="
                absolute
                bottom-[-200px]
                right-[-200px]
                h-[450px]
                w-[450px]
                rounded-full
                bg-purple-500/20
                blur-[170px]
                "
            />

            {children}

        </main>

    )

}