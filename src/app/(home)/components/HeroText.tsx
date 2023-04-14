'use client'

import JordonNichols from 'src/app/(GLOBALS)/components/JordonNichols'

export default function HeroText({ width }) {
  return (
    <>
      <div
        className="z-10 absolute top-0 right-1/2 translate-x-1/2 w-full select-none"
        style={{
          marginTop: `${width > 748 ? '72px' : '48px'}`,
        }}
      >
        <div className="text-center w-full">
          <h1 className=" 3xl:text-14xl font-bold lg:leading-zero 2xl:text-13xl xl:text-12xl lg:text-11xl inline-block sm:text-center md:text-10xl sm:text-8xl text-7xl leading-none">
            influxed
          </h1>
        </div>
        <h2 className="lg:text-3xl font-bold leading-zero text-center text-base 2xl:ml-5 2xl:text-5xl md:text-2xl lg:ml-3">
          <span className="font-light">developments, powered by </span>{' '}
          <JordonNichols />
        </h2>
      </div>
      <div className="z-10 w-full absolute lg:bottom-12 bottom-4 select-none">
        <div className="md:w-[500px] w-full flex flex-col gap-2 m-auto px-4">
          <p className="md:text-6xl text-2xl font-bold">
            in·flux·ed{' '}
            <span className="font-light md:text-2xl text-base">
              [ in-fluhks-ed ]
            </span>
          </p>
          <p className="italic font-light md:text-2xl">adjective</p>
          <p className="font-light md:text-2xl">
            : characterized by a rapid integration of new ideas, resources, or
            perspectives, leading to transformative changes or innovations.
          </p>
          <p className="md:text-2xl pl-6">
            <span className="font-bold">·</span>{' '}
            <span className="italic">influxed </span>
            developments
          </p>
        </div>
      </div>
    </>
  )
}
