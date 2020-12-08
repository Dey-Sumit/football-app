import React from "react"
import { Redirect, Route } from "react-router-dom"
import { useSelector } from "react-redux"
// import { Profiler } from "react";

const ProtectedRoute = ({ component: Component, ...rest }) => {
   //  const profile = useSelector(state => state.auth.profile)
   //  const loading = useSelector(state => state.auth.loading)
   const userId = useSelector(state => state.auth.userId)
   const myTeam = useSelector(state => state.apiData.myTeam)

   console.log("prot route")
   return (
      <Route
         {...rest}
         render={props =>
            !userId ? (
               <Redirect to="/auth" />
            ) : myTeam ? (
               <Component {...props} />
            ) : (
               <Redirect to="/chooseTeam" />
            )
         }
      />
   )
}

// const mapStateToProps = state => ({
//     userId: state.auth.userId,
//     has_profile: state.auth.has_profile,
//     loading: state.auth.loading
// })

// export default connect(mapStateToProps)(ProtectedRoute);
export default ProtectedRoute
