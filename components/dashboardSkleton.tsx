import React from 'react'
import { Skeleton } from './ui/skeleton'

function DashboardSkleton() {
  return (
    <div>
       <div className="w-full  h-auto sm:h-36 block sm:flex gap-3 pr-5 sm:pr-0">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[122px] sm:w-[220px] w-full my-2 sm:my-0 rounded-lg"
                />
              ))}
          </div>
          <div className="sm:flex block sm:w-282 w-full ">
          <Skeleton className="sm:w-[36%] w-[95%] h-90 mt-2 rounded-lg" />
          <div className="sm:w-[64%] w-[95%]">
          <Skeleton className="w-full h-32 mt-2 sm:ml-5 rounded-lg" />
          <Skeleton className="w-full h-58 mt-2 sm:ml-5 rounded-lg" />
          </div>
          </div>
    </div>
  )
}

export default DashboardSkleton
