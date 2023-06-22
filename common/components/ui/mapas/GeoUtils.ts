function toRadians(degrees: number) {
  return degrees * (Math.PI / 180)
}

function rad2degr(rad: number) {
  return (rad * 180) / Math.PI
}
function degr2rad(degr: number) {
  return (degr * Math.PI) / 180
}

const getCentro = (
  latLngInDegr: Array<string[]> | Array<number[]>
): Array<number> => {
  if (latLngInDegr.length === 0) {
    return [-17.405356227442883, -66.15823659326952]
  }

  if (latLngInDegr.length === 1) {
    return [Number(latLngInDegr[0][0]), Number(latLngInDegr[0][1])]
  }
  try {
    if (latLngInDegr.length < 1) throw 'error'
    var LATIDX = 0
    var LNGIDX = 1
    var sumX = 0
    var sumY = 0
    var sumZ = 0

    for (var i = 0; i < latLngInDegr.length; i++) {
      let x: number = Number(latLngInDegr[i][LATIDX])
      let y: number = Number(latLngInDegr[i][LNGIDX])
      let lat = degr2rad(x)
      let lng = degr2rad(y)
      // sum of cartesian coordinates
      sumX += Math.cos(lat) * Math.cos(lng)
      sumY += Math.cos(lat) * Math.sin(lng)
      sumZ += Math.sin(lat)
    }

    var avgX = sumX / latLngInDegr.length
    var avgY = sumY / latLngInDegr.length
    var avgZ = sumZ / latLngInDegr.length

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX)
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY)
    var lat = Math.atan2(avgZ, hyp)

    console.log('DUD calculo centro', [rad2degr(lat), rad2degr(lng)])
    return [rad2degr(lat), rad2degr(lng)]
  } catch (e) {
    return [-17.405356227442883, -66.15823659326952]
  }
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371 // Radio promedio de la Tierra en kilómetros

  // Convertir las latitudes y longitudes de grados a radianes
  const lat1Rad = toRadians(lat1)
  const lon1Rad = toRadians(lon1)
  const lat2Rad = toRadians(lat2)
  const lon2Rad = toRadians(lon2)

  // Calcular las diferencias de latitud y longitud
  const latDiff = lat2Rad - lat1Rad
  const lonDiff = lon2Rad - lon1Rad

  // Aplicar la fórmula del haversine
  const a =
    Math.sin(latDiff / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = earthRadius * c

  return distance
}

const calcularZoom = (puntos: Array<string[]> | Array<number[]>): number => {
  console.log('DUD>>>> puntos', puntos.length)
  let zoom = 14
  if (puntos.length === 0) {
    return 6
  }

  if (puntos.length === 1) {
    return 10
  }
  let maxDistance = 0
  for (let i = 0; i < puntos.length - 1; i++) {
    for (let j = i + 1; j < puntos.length; j++) {
      const distance = calculateDistance(
        Number(puntos[i][0]),
        Number(puntos[i][1]),
        Number(puntos[j][0]),
        Number(puntos[j][1])
      )
      if (distance > maxDistance) {
        maxDistance = distance
      }
    }
  }

  if (maxDistance > 1000) {
    zoom = 5
  } else if (maxDistance > 700) {
    zoom = 6
  } else if (maxDistance > 500) {
    zoom = 7
  } else if (maxDistance > 300) {
    zoom = 8
  } else if (maxDistance > 100) {
    zoom = 9
  } else if (maxDistance > 70) {
    zoom = 10
  } else if (maxDistance > 50) {
    zoom = 11
  } else if (maxDistance > 10) {
    zoom = 12
  }

  console.log('DUD>>>>>', zoom)

  return zoom
}

export { getCentro, calcularZoom }
