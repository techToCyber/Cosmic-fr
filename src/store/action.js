import axios from "axios";

export const fetchGraphData = (payload) => {
    return (dispatch) => {
        dispatch({ type: "REQUEST_GRAPH_DATA"});

        axios({
            method:"POST",
            url:"http://localhost:5000//graph",
            data:{
              AssemblyConstituency: payload.selectAssembly || "All",
              part_number: payload.selectpart || "All"
            }
          }).then((res)=>{
                const data = res.data
                dispatch({ type: "RECEIVE_GRAPH_DATA", payload: data });
            })
    }
}
