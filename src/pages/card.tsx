import { useEffect, useState } from 'react';
import Button from './button.tsx';
import { db } from '../db';
import { Number as NumberTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export default function Card(){
    const [count, setCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            if (!db) return;
            try {
                const result = await db.select().from(NumberTable).where(eq(NumberTable.id, 1));
                if (result.length > 0) {
                    setCount(result[0].value ?? 0);
                } else {
                    // Initialize if not exists, handle potential conflict
                    try {
                        await db.insert(NumberTable).values({ id: 1, value: 0 }).onConflictDoNothing();
                    } catch (e) {
                        // Ignore conflict, it means it was already inserted
                    }
                    const retryResult = await db.select().from(NumberTable).where(eq(NumberTable.id, 1));
                    setCount(retryResult[0]?.value ?? 0);
                }
            } catch (err) {
                console.error("Failed to fetch count:", err);
                setError("Failed to load counter from database.");
            } finally {
                setLoading(false);
            }
        };

        fetchCount();
    }, []);

    const updateCount = async (newCount: number) => {
        if (!db) return;
        setLoading(true);
        try {
            await db.update(NumberTable)
                .set({ value: newCount })
                .where(eq(NumberTable.id, 1));
            setCount(newCount);
        } catch (err) {
            console.error("Failed to update count:", err);
            setError("Failed to update counter in database.");
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-center text-3xl text-black relative">
                {count ?? 0}
                {loading && (
                    <div className="absolute -top-6 text-sm text-gray-500">Saving...</div>
                )}
            </div>
            <div>
                <Button
                    content="-"
                    onClick={() => count !== null && updateCount(count - 1)}
                />
                <Button
                    content="+"
                    onClick={() => count !== null && updateCount(count + 1)}
                />
            </div>
        </div>
    )
}