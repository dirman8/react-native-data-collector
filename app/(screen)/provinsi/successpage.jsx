import { PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT } from '../../constants/calegProvinsi';
import SuccessPage from "../../components/manualcount/suceesspage";
import { provinsiStorage } from "../../utils/storage";

export default function SuccessPageProvinsi() {
    const parties = [PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT];
    return (
        <SuccessPage parties={parties} tingkat="provinsi" storage={provinsiStorage} datakey="statusprovinsi"/>
    )
}