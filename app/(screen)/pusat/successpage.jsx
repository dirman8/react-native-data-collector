import { PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT } from '../../constants/calegPusat';
import SuccessPage from "../../components/manualcount/suceesspage";
import { pusatStorage } from "../../utils/storage";

export default function SuccessPagePusat() {
    const parties = [PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT];

    return (
        <SuccessPage parties={parties} tingkat="pusat" storage={pusatStorage} datakey="statuspusat"/>
    )
}