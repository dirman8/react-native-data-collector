import SuccessPage from "../../components/manualcount/suceesspage";
import { kotaStorage } from "../../utils/storage";
import { dapilStorage } from '../../utils/storage';
import { dapilPartyMap } from '../../utils/pilihDapil';

export default function SuccessPageKota() {
    const serializedDapil = dapilStorage.getString('dapil');
    const getDapil = JSON.parse(serializedDapil);

    const parties = dapilPartyMap[`dapil${getDapil.dapil}`] || [];

    return (
        <SuccessPage tingkat="kota" parties={parties} storage={kotaStorage} datakey="statuskota"/>
    )
}