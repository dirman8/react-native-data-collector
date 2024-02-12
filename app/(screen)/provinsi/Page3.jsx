import { PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT } from '../../constants/calegProvinsi';
import ManualCount3 from "../../components/manualcount/Page3";
import {COLORS} from "../../constants/theme";
import { provinsiStorage } from '../../utils/storage';

export default function ManualCountProvinsi3() {
    const parties = [PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT];

    return (
        <ManualCount3 parties={parties} tingkat="provinsi" storage={provinsiStorage} bgcolor={COLORS.blueProvinsi} title="Input DPRD Provinsi"/>
    );
}