// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Tab as HeadlessTab, type TabProps } from '@headlessui/react';
import { type SuiAddress, type Transaction } from '@mysten/sui.js';

import { SummaryCard } from '../SummaryCard';
import { Command } from './Command';
import { Input } from './Input';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { useTransactionData } from '_src/ui/app/hooks';

interface Props {
    sender?: SuiAddress;
    transaction: Transaction;
}

const Tab = (props: TabProps<'div'>) => (
    <HeadlessTab
        className="border-0 border-b border-transparent ui-selected:border-hero text-steel-darker p-0 pb-2 -mb-px border-solid ui-selected:text-hero-dark text-body font-semibold bg-transparent outline-none cursor-pointer"
        {...props}
    />
);

export function TransactionDetails({ sender, transaction }: Props) {
    const { data: transactionData } = useTransactionData(sender, transaction);

    if (
        transactionData?.commands.length === 0 &&
        transactionData.inputs.length === 0
    ) {
        return null;
    }

    return (
        <SummaryCard header="Transaction Details" initialExpanded>
            {transactionData ? (
                <div>
                    <HeadlessTab.Group>
                        <HeadlessTab.List className="flex gap-6 border-0 border-b border-solid border-gray-45 mb-6">
                            {!!transactionData.commands.length && (
                                <Tab>Commands</Tab>
                            )}
                            {!!transactionData.inputs.length && (
                                <Tab>Inputs</Tab>
                            )}
                        </HeadlessTab.List>
                        <HeadlessTab.Panels>
                            {!!transactionData.commands.length && (
                                <HeadlessTab.Panel className="flex flex-col gap-6">
                                    {transactionData.commands.map(
                                        (command, index) => (
                                            <Command
                                                key={index}
                                                command={command}
                                            />
                                        )
                                    )}
                                </HeadlessTab.Panel>
                            )}
                            {!!transactionData.inputs.length && (
                                <HeadlessTab.Panel className="flex flex-col gap-2">
                                    {transactionData.inputs.map(
                                        (input, index) => (
                                            <Input key={index} input={input} />
                                        )
                                    )}
                                </HeadlessTab.Panel>
                            )}
                        </HeadlessTab.Panels>
                    </HeadlessTab.Group>
                </div>
            ) : (
                <LoadingIndicator />
            )}
        </SummaryCard>
    );
}
