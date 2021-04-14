import generateUniqueId from 'generate-unique-id'

const id = () => {
   return generateUniqueId({
    length: 5,
    useLetters: true,
    useNumbers: true,
})}



export default generateUniqueId