// export const getUrls = () => {
//   return fetch('http://localhost:3001/api/v1/urls')
//       .then(response => response.json())
// }


const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      return response.json()
    })
}

export default getUrls