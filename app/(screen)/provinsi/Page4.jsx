import { PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT } from '../../constants/calegProvinsi';
import ManualCount4 from "../../components/manualcount/Page4";
import {COLORS} from "../../constants/theme";
import { provinsiStorage } from '../../utils/storage';

export default function ManualCountProvinsi4() {
    const parties = [PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT];

    return (
        <ManualCount4 parties={parties} tingkat="provinsi" storage={provinsiStorage} bgcolor={COLORS.blueProvinsi} title="Input DPRD Provinsi"/>
    );
}