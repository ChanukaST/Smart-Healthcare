import time
import numpy as np

def original_method(n_samples):
    np.random.seed(101)
    age = np.random.randint(20, 85, n_samples)
    systolic_bp = np.random.randint(90, 180, n_samples)
    blood_sugar = np.random.randint(70, 250, n_samples)
    chest_pain = np.random.choice([0, 1], n_samples, p=[0.7, 0.3])
    fever = np.random.choice([0, 1], n_samples, p=[0.6, 0.4])

    start = time.time()
    risk = []
    for a, s_bp, bs, cp, f in zip(age, systolic_bp, blood_sugar, chest_pain, fever):
        score = (s_bp > 140) + (bs > 140) + (cp * 2) + (f * 1) + ((a > 60) * 1)
        if score >= 3:
            risk.append("HIGH_RISK")
        elif score >= 1:
            risk.append("MODERATE_RISK")
        else:
            risk.append("LOW_RISK")
    end = time.time()
    return risk, end - start

def optimized_method(n_samples):
    np.random.seed(101)
    age = np.random.randint(20, 85, n_samples)
    systolic_bp = np.random.randint(90, 180, n_samples)
    blood_sugar = np.random.randint(70, 250, n_samples)
    chest_pain = np.random.choice([0, 1], n_samples, p=[0.7, 0.3])
    fever = np.random.choice([0, 1], n_samples, p=[0.6, 0.4])

    start = time.time()
    scores = (systolic_bp > 140) + (blood_sugar > 140) + (chest_pain * 2) + (fever * 1) + ((age > 60) * 1)

    conditions = [
        scores >= 3,
        scores >= 1
    ]
    choices = [
        "HIGH_RISK",
        "MODERATE_RISK"
    ]
    risk = np.select(conditions, choices, default="LOW_RISK").tolist()
    end = time.time()
    return risk, end - start

if __name__ == "__main__":
    n_samples = 100000
    orig_risk, orig_time = original_method(n_samples)
    opt_risk, opt_time = optimized_method(n_samples)

    print(f"Number of samples: {n_samples}")
    print(f"Results match exactly: {orig_risk == opt_risk}")
    print(f"Original Time: {orig_time:.6f} seconds")
    print(f"Optimized Time: {opt_time:.6f} seconds")

    if opt_time > 0:
        print(f"Speedup: {orig_time / opt_time:.2f}x")
