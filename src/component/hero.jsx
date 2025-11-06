import hero from '../assets/hero.svg'

export default function Hero(){
    return(
        <div className='flex items-center justify-center text-white text-2xl font-semibold'>
            <div>
                <h1>100 Thousand Songs, ad-free</h1>
                <p>Over thousands podcast episodes</p>
            </div>
            <div>
                <img src={hero} alt="hero.svg" />
            </div>
        </div>
    )
}