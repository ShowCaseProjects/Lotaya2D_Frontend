import {Backdrop, CircularProgress, styled as styledMUI} from "@mui/material"
import zIndex from "@mui/material/styles/zIndex";

type LoadingProps={
    loadingIsOpen:boolean;
}

export const Loading=(props:LoadingProps)=>{
    return(
        <div>
          <StyledBackdrop
          sx={{zIndex:(theme)=>theme.zIndex.drawer-1}}
          open={props.loadingIsOpen}
          >
           <CircularProgress/>
          </StyledBackdrop>
        </div>
    );
}

export const StyledBackdrop=styledMUI(Backdrop)
({
  width:'100%',
  height:'100%',
  backgroundColor:'rgba(255,255,255,0.5)',
  marginLeft:'7%'
});