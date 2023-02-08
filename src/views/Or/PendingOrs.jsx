// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import Spinner from "../../components/Spinner/Spinner"
// import DropDownMenu from "../../components/DropDownMenu/DropDownMenu"
// import { listOfOrs } from "../../services/OrServices"
// import { useAuthContext } from "../../contexts/AuthContext"
// import BackButton from "../../components/BackButton/BackButton"
// import "./Or.css"

// const PendingOrs = () => {

//     const [ors, setOrs] = useState(null)
//     const { garage } = useAuthContext()



//     useEffect(() => {
//         listOfOrs()
//             .then(response => {
//                 setOrs(response)
//             })
//     }, [garage])



//     return (
//         <div className="justify-content-center">
//             <h1 className="mt-4 mb-3 text-center orTitle">Pending OR's</h1>
//             {!ors ? (
//                 <Spinner />
//             ) : (
//                 <div className="panel">
//                     <table className="table">
//                         <thead>
//                             <tr>
//                                 <th scope="col">Or number</th>
//                                 <th scope="col">Entry Date</th>
//                                 <th scope="col">Plate</th>
//                                 <th scope="col">Make & Model</th>
//                                 <th scope="col">VIN</th>
//                             </tr>
//                         </thead>
//                         {/* <Link to={`/vehicles/${vehicle.id}`}> */}
//                         <tbody>
//                             {ors?.map((or, i) => (
//                                 <tr key={i}>
//                                     <th scope="row">{('22000') + i}</th>
//                                     <td>{new Date(or.createdAt).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</td>
//                                     <td>{or?.vehicle?.plate}</td>
//                                     <td>{or?.vehicle?.make} {or?.vehicle?.model}</td>
//                                     <td>{or?.vehicle?.vin}</td>
//                                     <Link to={`/ors/${or.id}`}>
//                                     <td><i className="fa-solid fa-xl fa-info mt-2"></i></td></Link>
//                                 </tr>
//                             )
//                             )}
//                         </tbody>
//                         {/* </Link> */}
//                     </table>
//                 </div>
//             )}
//             <BackButton  customRoute={"home"}/>
//             <DropDownMenu />
//         </div >
//     )
// }

// export default PendingOrs