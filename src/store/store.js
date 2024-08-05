import create from "zustand";

const useStore = create ((set)=>({
    // genreId:null,
    // inc:(id)=> set({genreId:id}),
    // //
    // movieName:null,
    // setMovieName:(name)=>set(),
    // // 
    list:null,
    setList:(names)=>set({list:names})
}))