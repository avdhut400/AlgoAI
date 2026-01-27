import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

export default function Dash() {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    fetch("http://localhost:3000/api/dashboard", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      });
  }, [isLoaded]);

  if (!isLoaded || loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  const usagePercent = Math.min(
    (data.used / data.usage_limit) * 100,
    100
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Welcome, {user.firstName} 👋
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Plan" value={data.plan} />
        <Card title="Used" value={data.used} />
        <Card title="Limit" value={data.usage_limit} />
      </div>

      {/* Usage bar */}
      <div className="border rounded p-4">
        <p className="text-sm mb-2">Monthly usage</p>
        <div className="h-3 bg-gray-200 rounded">
          <div
            className="h-3 bg-black rounded"
            style={{ width: `${usagePercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {data.used} / {data.usage_limit} requests
        </p>
      </div>

      {/* Recent activity */}
      <div className="border rounded p-4">
        <h2 className="font-semibold mb-3">Recent Activity</h2>
        <ul className="text-sm space-y-2">
          {data.activity.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>{item.action}</span>
              <span className="text-gray-400">
                {new Date(item.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Limit reached */}
      {data.used >= data.usage_limit && (
        <div className="border border-red-400 bg-red-50 p-4 rounded">
          <p className="text-sm">
            Monthly limit reached. Upgrade to continue.
          </p>
          <a href="/billing" className="underline font-medium">
            Upgrade plan →
          </a>
        </div>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="border rounded p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
