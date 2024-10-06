import personMetadata from "@data/personMetadata"


const ConsoleBanner = () => {
    console.log("Hey, buddy 👋 Don't forget to follow me:")
    console.log(`💼 LinkedIn: ${personMetadata.linkedinUrl}`)
    console.log(`🛠️ Github: ${personMetadata.githubUrl}`)
    console.log(`X Twitter: ${personMetadata.twitterUrl}`)
    console.log(`May the force be with you 🙌`)

    return <></>
}

export default ConsoleBanner