import { afterEach, describe, expect, it, vi } from "vitest";

import { trackEvent } from "./track";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("trackEvent", () => {
  it("usa navigator.sendBeacon cuando está disponible", () => {
    const beacon = vi.fn().mockReturnValue(true);
    const fetchMock = vi.fn();
    vi.stubGlobal("navigator", { sendBeacon: beacon });
    vi.stubGlobal("fetch", fetchMock);

    trackEvent("cta_click", "A");

    expect(beacon).toHaveBeenCalledOnce();
    expect(beacon.mock.calls[0]![0]).toBe("/api/track-event");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("cae a fetch con keepalive si no hay sendBeacon", () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("navigator", {});
    vi.stubGlobal("fetch", fetchMock);

    trackEvent("cta_click", "B");

    expect(fetchMock).toHaveBeenCalledOnce();
    const [, init] = fetchMock.mock.calls[0]!;
    expect(init.keepalive).toBe(true);
    expect(JSON.parse(init.body as string)).toMatchObject({ action: "cta_click", variant: "B" });
  });
});
