import React from 'react'
import Searchbox from './Searchbox'
import Topparagraph from './Topparagraph'
import Ipadpro from './Ipadpro'
import Mackbook from './Mackbook'
import Iphone11_c from './Iphone11_c'
import Appletv from './Appletv'
import Arcade from './Arcade'
import Carousel from './Carousel'
import YoutubeVidios from './YoutubeVidios'
import Iphone11 from './Iphone11'
function Main() {
  return (
    <div>
    <Searchbox/>
   <Topparagraph/>  
   <Ipadpro/> 
   <Mackbook/> 
   {/* <Iphone11/> */}
   <Iphone11_c/>
   <Appletv/>
   <Arcade/>
   <Carousel/>
   {/* <YoutubeVidios/> */}
    </div>
  )
}
export default Main
