// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

use jsonrpsee::core::RpcResult;
use jsonrpsee_proc_macros::rpc;

use sui_json_rpc_types::{CheckpointId, EpochInfo, EpochPage, ObjectsPage, SuiObjectResponseQuery};
use sui_open_rpc_macros::open_rpc;
use sui_types::base_types::{EpochId, ObjectID};

#[open_rpc(namespace = "suix", tag = "Extended API")]
#[rpc(server, client, namespace = "suix")]
pub trait ExtendedApi {
    /// Return a list of epoch info
    #[method(name = "getEpochs")]
    async fn get_epoch(
        &self,
        /// optional paging cursor
        cursor: Option<EpochId>,
        /// maximum number of items per page
        limit: Option<usize>,
    ) -> RpcResult<EpochPage>;

    /// Return current epoch info
    #[method(name = "getCurrentEpoch")]
    async fn get_current_epoch(&self) -> RpcResult<EpochInfo>;

    /// Return the list of queried objects. Note that this is an enhanced full node only api.
    #[method(name = "queryObjects")]
    async fn query_objects(
        &self,
        /// the objects query criteria.
        query: SuiObjectResponseQuery,
        /// An optional paging cursor. If provided, the query will start from the next item after the specified cursor. Default to start from the first item if not specified.
        cursor: Option<ObjectID>,
        /// Max number of items returned per page, default to [QUERY_MAX_RESULT_LIMIT_OBJECTS] if not specified.
        limit: Option<usize>,
        /// If not specified, objects may be created or deleted across pagination requests. This parameter is only supported when the sui-indexer instance is running.
        at_checkpoint: Option<CheckpointId>,
    ) -> RpcResult<ObjectsPage>;

    /// Return total address count
    #[method(name = "getTotalAddresses")]
    async fn get_total_addresses(&self) -> RpcResult<u64>;

    /// Return total object count
    #[method(name = "getTotalObjects")]
    async fn get_total_objects(&self) -> RpcResult<u64>;

    /// Return total package count
    #[method(name = "getTotalPackages")]
    async fn get_total_packages(&self) -> RpcResult<u64>;
}
