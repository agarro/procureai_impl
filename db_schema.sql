-- Database Schema (PostgreSQL)
CREATE TABLE IF NOT EXISTS procurement_logs (
    id SERIAL PRIMARY KEY,
    context_id VARCHAR(255) NOT NULL,
    agent_name VARCHAR(50) NOT NULL,
    action TEXT NOT NULL,
    thought_process TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS purchase_orders (
    id VARCHAR(50) PRIMARY KEY,
    supplier_id VARCHAR(50) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
