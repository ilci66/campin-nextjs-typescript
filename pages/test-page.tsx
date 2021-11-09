// For some reason this works here but not on the page that it is supposed to work in
const UserList = ({ markers }) =>  {

  console.log("markers ==> ", markers)

  return (<>
    all markers

  </>)
  
}

export default UserList


export async function getStaticProps() {
  const url = process.env.NEXT_PUBLIC_SITE_URL

  const response = await fetch(`${url}/api/marker`);
  const data = await response.json()

  console.log(data[0]);

  return {
    props: {
      markers: data.data
    }
  }
}