import React from 'react'

type Props = {
  src: string
}

//"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.575349265458!2d89.3703407760465!3d24.844191845907055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc55c3e56a241b%3A0x2887fac4f5ffcb6d!2sDoctors%20Dental%20Implant%20Center%20and%20Medical%20Care%2C%20Bogura!5e0!3m2!1sen!2sbd!4v1740115333849!5m2!1sen!2sbd"

const EmbeddedMap: React.FC<Props> = ({ src }) => {
  return (
    <div className="relative w-full aspect-video">
      <iframe
        src={src}
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}

export default EmbeddedMap
