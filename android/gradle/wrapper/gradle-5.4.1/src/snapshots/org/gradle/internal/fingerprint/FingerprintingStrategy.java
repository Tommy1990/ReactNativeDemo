/*
 * Copyright 2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.gradle.internal.fingerprint;

import org.gradle.internal.scan.UsedByScanPlugin;
import org.gradle.internal.snapshot.FileSystemLocationSnapshot;
import org.gradle.internal.snapshot.FileSystemSnapshot;

import java.util.Map;

/**
 * Strategy for converting a sequence of {@link FileSystemLocationSnapshot}s into a {@link FileCollectionFingerprint}.
 */
public interface FingerprintingStrategy {

    /**
     * Converts the roots into the {@link FileSystemLocationFingerprint}s used by the {@link FileCollectionFingerprint}.
     */
    Map<String, FileSystemLocationFingerprint> collectFingerprints(Iterable<? extends FileSystemSnapshot> roots);

    /**
     * Used by the {@link FileCollectionFingerprint} to compare/hash two maps of fingerprints generated by {@link #collectFingerprints(Iterable)}
     */
    FingerprintCompareStrategy getCompareStrategy();

    @UsedByScanPlugin("not linked directly - name are expected as part of org.gradle.api.internal.tasks.SnapshotTaskInputsBuildOperationType.Result.VisitState.getPropertyNormalizationStrategyName")
    String getIdentifier();

    CurrentFileCollectionFingerprint getEmptyFingerprint();

    String normalizePath(FileSystemLocationSnapshot snapshot);
}
