import patternBackground from '../assets/banner-img.png';

export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${patternBackground.src})` }}>
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48 flex items-center justify-center">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8 text-center">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Summer styles are finally here
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care
              if you live or die.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}