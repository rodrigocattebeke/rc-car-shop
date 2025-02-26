import { HeaderLinks } from "../HaderLinks";
import SearchInput from "../../Common/SearchInput";
import { UserControls } from "../UserControls";

export const NavBar = () => {
  return (
    <nav className={`container-xl d-flex row row-gap-3 align-items-start align-items-md-center py-1 `}>
      <HeaderLinks responsiveClass="col-8 col-md-3 order-1"></HeaderLinks>
      <SearchInput responsiveClass="col-12 col-md-6 order-3 order-md-2 pb-2 pb-md-0"></SearchInput>
      <UserControls responsiveClass="col-4 col-md-3 order-2 order-md-3 pt-3 pt-md-0 justify-content-end pe-md-"></UserControls>
    </nav>
  );
};
