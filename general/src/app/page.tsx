import Image from "next/image";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center  pb-6 pt-8  lg:static lg:w-auto  lg:rounded-full lg:border lg:border-green-500 lg:p-4 ">
            Get started by signing up
          </p>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
            <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://dercolbags.com"
                target="_blank"
                rel="noopener noreferrer"
            >
              By{" "}
              <Image
                  src="https://res.cloudinary.com/ddwet1dzj/image/upload/v1722947583/agency/bjmxjqsir7jxozcecfbd.png"
                  alt="Dercolbags Packaging Limited"
                  className=""
                  width={60}
                  height={24}
                  priority
              />
            </a>
          </div>
        </div>

        <div className="relative z-[-1] flex place-items-center ">
          <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
              src="https://res.cloudinary.com/ddwet1dzj/image/upload/v1723635102/agency/h2rcrkei9ofpit4bfmw7.png"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
          />
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          <a
              href="https://main.d1lolo334q00y7.amplifyapp.com"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-green-500"
              target="_blank"
              rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-semibold">
              Enterprise Interface
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Organize corporate meals in reusable packs, reducing waste.
            </p>
          </a>

          <a
              href="https://main.d3h2qrol1316a6.amplifyapp.com"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-green-500  "
              target="_blank"
              rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-semibold">
              Employee Interface
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Simplify meal planning and enjoy sustainable lunches.
            </p>
          </a>

          <a
              href="https://main.d1tchh5v04pztk.amplifyapp.com"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-green-500"
              target="_blank"
              rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-semibold">
              Vendor Interface
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Provide eco-friendly meal options to corporate clients.
            </p>
          </a>

          <a
              href="https://main.d2pyl4na0l0nj7.amplifyapp.com"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-green-500"
              target="_blank"
              rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-semibold">
              Admin Interface
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Manage and track reusable pack distribution.
            </p>
          </a>
        </div>
      </main>
  );
}
