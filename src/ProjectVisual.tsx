import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  Circle,
  LayoutGrid,
  List,
  Snowflake,
  Wallet,
  Box,
} from "lucide-react";

/** Editorial workflow illustrations, not screenshots of running applications. */
export function ProjectVisual({ id }: { id: string }) {
  if (id === "cash-g")
    return (
      <div className="project-visual visual-banking" aria-hidden="true">
        <div className="bank-window">
          <div className="mini-sidebar">
            <Wallet size={15} />
            <LayoutGrid size={12} />
            <List size={12} />
            <Circle size={12} />
          </div>
          <div className="bank-content">
            <div className="mini-header">
              CASH-G <span>Personal banking</span>
            </div>
            <span className="tiny-label">DEMO ACCOUNT</span>
            <p className="mini-greeting">
              A little more clarity.
              <br />A lot more control.
            </p>
            <div className="balance-label">Available balance</div>
            <div className="mini-balance">
              ₱ 24,850<span>.00</span>
            </div>
            <div className="bank-actions">
              <span>
                <ArrowDownLeft size={12} /> Cash in
              </span>
              <span>
                <ArrowUpRight size={12} /> Transfer
              </span>
            </div>
            <div className="mini-transaction">
              <span className="transaction-icon">
                <ArrowDownLeft size={11} />
              </span>
              <span>
                Cash in<small>Completed</small>
              </span>
              <b>+ ₱ 2,500</b>
            </div>
          </div>
        </div>
        <div className="visual-floating">
          <Check size={12} /> Both sides. One transaction.
        </div>
      </div>
    );
  if (id === "arctic")
    return (
      <div className="project-visual visual-arctic" aria-hidden="true">
        <div className="arctic-window">
          <div className="mini-header">
            <span className="arctic-brand">
              <Snowflake size={14} /> ARCTIC
            </span>
            <span>Service workspace</span>
          </div>
          <div className="arctic-title">
            Good service.
            <br />
            <span>From start to finish.</span>
          </div>
          <div className="kanban">
            {["Booked", "On site", "Complete"].map((stage, index) => (
              <div key={stage}>
                <div className="kanban-label">
                  <i />
                  {stage}
                  <span>{index + 1}</span>
                </div>
                <div className="mini-job">
                  <Snowflake size={15} />
                  <strong>
                    {
                      ["AC maintenance", "System inspection", "Unit cleaning"][
                        index
                      ]
                    }
                  </strong>
                  <span>Service visit</span>
                  <div className="mini-job-footer">
                    <i>{["JD", "AM", "RL"][index]}</i>
                    <Check size={10} />
                  </div>
                </div>
                {index === 0 && (
                  <div className="mini-job ghost-job">
                    <strong>Follow-up visit</strong>
                    <span>Next in the queue</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  return (
    <div className="project-visual visual-assets" aria-hidden="true">
      <div className="asset-window">
        <div className="mini-header">
          <span>
            <Box size={14} /> Asset workspace
          </span>
          <span>Organization A</span>
        </div>
        <div className="asset-title">
          Everything in
          <br />
          <em>its right place.</em>
        </div>
        <div className="asset-table">
          <div className="asset-table-head">
            <span>Asset</span>
            <span>Status</span>
          </div>
          {["MacBook Pro", "Dell UltraSharp", "ThinkPad X1"].map(
            (asset, index) => (
              <div key={asset}>
                <span>
                  <span className="asset-symbol">
                    {index === 1 ? "▱" : "▰"}
                  </span>
                  {asset}
                </span>
                <span className="asset-status">
                  {index === 2 ? "Available" : "Assigned"}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="asset-scope">
        <Box size={12} /> One workspace. Clear boundaries.
      </div>
    </div>
  );
}
