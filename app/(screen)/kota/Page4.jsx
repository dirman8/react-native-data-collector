import { PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT } from '../../constants/calegDapil1';
import ManualCount4 from "../../components/manualcount/Page4";
import {COLORS} from "../../constants/theme";
import { kotaStorage } from '../../utils/storage';

export default function ManualCountKota4() {
    const parties = [PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT];

    return (
        <ManualCount4 parties={parties} tingkat="kota" storage={kotaStorage} bgcolor={COLORS.greenKota} title="Input DPRD Kota Surabaya"/>
    );
}