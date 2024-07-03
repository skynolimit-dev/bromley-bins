import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage";
import { getBinId, getBinData, getBinInterests, getNextBins, getNextCollectionDate, getFutureBins, setBinData, setNextBins, setNextCollectionDate, setFutureBins } from "../lib/store";

import _ from 'lodash';
import moment from "moment";
import './BinDetails.css';

import BinCard from './BinCard';

const BinDetails: React.FC = () => {

    const binId = getBinId();
    const binData = getBinData();
    const nextBins = getNextBins();
    const futureBins = getFutureBins();
    const nextCollectionDate = getNextCollectionDate();
    const binInterests = getBinInterests();

    const store = new Storage();

    async function init() {
        console.log('Init bin details...');
        const binDataEnriched =enrichBinData();
        setNextAndFutureBins(binDataEnriched);
    }

    // Add UTC timestamps to the bin data (to work out next vs future bins)
    // Add the category name to the bin data
    function enrichBinData() {
        // Take a deep copy of the bin data
        const binDataEnriched = _.cloneDeep(binData);
        for (const category in binDataEnriched) {
            const bin = binDataEnriched[category];
            const isInterested = _.get(binInterests, category, true);
            _.set(binDataEnriched[category], 'isInterested', isInterested);
            _.set(binDataEnriched[category], 'category', category);
            if (bin.nextCollection) {
                _.set(binDataEnriched[category], 'collectionInProgress', bin.nextCollection.toLowerCase().includes('in progress'));
                _.set(bin, 'nextCollectionUtc', moment(bin.nextCollection, 'dddd, Do MMMM').toISOString());
            }
        }
        return binDataEnriched;
    }

    // Set the nextBins array based on the nextCollectionUtc date values
    function setNextAndFutureBins(binDataEnriched: any) {
        const binDataOrdered = _.orderBy(binDataEnriched, ['nextCollectionUtc'], ['asc']);
        let nextCollectionDate = null;
        let nextBins = [];
        let futureBins = [];
        for (const bin of binDataOrdered) {
            if (bin.isInterested) {
                if (nextCollectionDate === null) {
                    nextCollectionDate = bin.nextCollectionUtc;
                    setNextCollectionDate(nextCollectionDate);
                    nextBins.push(bin);
                }
                else if (nextCollectionDate === bin.nextCollectionUtc) {
                    nextBins.push(bin);
                }
                else if (bin.nextCollectionUtc) {
                    futureBins.push(bin);
                }
            }
        }
        setNextBins(nextBins);
        setFutureBins(futureBins);
        // console.log('Next bins:', nextBins);
        // console.log('Future bins:', futureBins);
    }

    useEffect(() => {
        // console.log('BinDetails: useEffect()');
        if (binData) {
            init();
        }
    }, [binId, binData, binInterests]);

    if (binId && binId >= 0 && nextBins && nextBins.length >= 0 && futureBins && futureBins.length >= 0) {
        return (
            <div className="container">
                <h1 className='ion-text-center'>{moment(nextCollectionDate).format('dddd, MMMM Do')} ({moment(nextCollectionDate).toNow(true)})</h1>
                <div>
                    {nextBins.map((bin: any) => <BinCard key={bin.category} bin={bin} nextCollection={true} />)}
                </div>
                <h1 className='ion-text-center ion-padding-top'>Future collections</h1>
                <div>
                    {futureBins.map((bin: any) => <BinCard key={bin.category} bin={bin} nextCollection={false} />)}
                </div>
            </div>
        );
    }
}

export default BinDetails;